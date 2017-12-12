JSONEditor.defaults.editors.imageUpload = JSONEditor.AbstractEditor.extend({
  // Get default value of this editor if no data exists.
  getDefault: function() {
    return $extend({},this.schema["default"] || {});
  },
  // Register this editor and all of its sub editors.
  register: function () {
    this._super();
    if (this.editors) {
      for (var i in this.editors) {
        if (!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].register();
      }
    }
  },
  // Unregister this editor and all of its sub editors.
  unregister: function () {
    this._super();
    if (this.editors) {
      for (var i in this.editors) {
        if (!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].unregister();
      }
    }
  },
  // Enable editor and sub editors for editing
  enable: function () {
    this._super();
    if (this.editors) {
      for (var key in this.editors) {
        if (this.editors.hasOwnProperty(key) && key !== 'width' && key !== 'height')  {
          this.editors[key].enable();
        }
      }
    }
  },
  // disable editor and sub editors for editing
  disable: function () {
    this._super();
    if (this.editors) {
      for (var key in this.editors) {
        if (this.editors.hasOwnProperty(key))  {
          this.editors[key].disable();
        }
      }
    }
  },
  // Prebuild the editor, 
  preBuild: function () {
    this._super();

    this.editors = {};
    this.cached_editors = {};
    var self = this;
    this.schema.properties = this.schema.properties || {};

    // Image uploader should be rendered as a div
    if (!this.schema.defaultProperties) {
      this.schema.defaultProperties = Object.keys(this.schema.properties);
    }

    this.minWidth = 0;
    this.maxWidth = 1;

    // iterate through default properties, add them to the editor
    $each(this.schema.defaultProperties, function (i, key) {
      self.addObjectProperty(key, true);

      if(self.editors[key]) {
        self.minwidth = Math.max(self.minwidth,(self.editors[key].options.grid_columns || self.editors[key].getNumColumns()));
        self.maxwidth += (self.editors[key].options.grid_columns || self.editors[key].getNumColumns());
      }
    });

    // Sort editors by propertyOrder
    this.property_order = Object.keys(this.editors);
    this.property_order = this.property_order.sort(function(a,b) {
      var ordera = self.editors[a].schema.propertyOrder;
      var orderb = self.editors[b].schema.propertyOrder;
      if(typeof ordera !== "number") ordera = 1000;
      if(typeof orderb !== "number") orderb = 1000;

      return ordera - orderb;
    });
  },
  build: function () {
    var self = this;

    // Title/header.
    this.header = document.createElement('span');
    this.header.textContent = this.getTitle();
    this.title = this.theme.getHeader(this.header);
    this.container.appendChild(this.title);
    this.container.style.position = 'relative';

    // Description
    if (this.schema.description) {
      this.description = this.theme.getDescription(this.schema.description);
      this.container.appendChild(this.description);
    }

    // Validation error area
    this.error_holder = document.createElement('div');
    this.container.appendChild(this.error_holder);

    // Child editor area
    this.editor_holder = this.theme.getIndentedPanel();
    this.container.appendChild(this.editor_holder);

    // Container for rows of child editors
    this.row_container = this.theme.getGridContainer();
    this.editor_holder.appendChild(this.row_container);

    // Set up child editors
    $each(this.editors, function (key, editor) {
      var holder = self.theme.getGridColumn();
      self.row_container.appendChild(holder);

      editor.setContainer(holder);
      editor.build();
      editor.postBuild();
      // Height and width should be disabled and determined by the image.
      if (key === 'height' || key === 'width') {
        editor.disable();
        editor.hide();
      }
    });

    // Control buttons
    this.title_controls = this.theme.getHeaderButtonHolder();
    this.editjson_controls = this.theme.getHeaderButtonHolder();
    this.title.appendChild(this.title_controls);
    this.title.appendChild(this.editjson_controls);

    // Collapse/Expand buttons
    this.collapsed = false;
    this.toggle_button = this.getButton('','collapse',this.translate('button_collapse'));
    this.title_controls.appendChild(this.toggle_button);
    this.toggle_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      if(self.collapsed) {
        self.editor_holder.style.display = '';
        self.collapsed = false;
        self.setButtonText(self.toggle_button,'','collapse',self.translate('button_collapse'));
      }
      else {
        self.editor_holder.style.display = 'none';
        self.collapsed = true;
        self.setButtonText(self.toggle_button,'','expand',self.translate('button_expand'));
      }
    });

    // If it should start collapsed
    if(this.options.collapsed) {
      $trigger(this.toggle_button,'click');
    }

    // Collapse button disabled
    if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
      if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
    }
    else if(this.jsoneditor.options.disable_collapse) {
      this.toggle_button.style.display = 'none';
    }
  },
  destroy: function () {
    $each(this.cached_editors, function (index, element) {
      element.destroy();
    });
    if(this.editor_holder) this.editor_holder.innerHTML = '';
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.error_holder && this.error_holder.parentNode) this.error_holder.parentNode.removeChild(this.error_holder);

    this.editors = null;
    this.cached_editors = null;
    if(this.editor_holder && this.editor_holder.parentNode) this.editor_holder.parentNode.removeChild(this.editor_holder);
    this.editor_holder = null;

    this._super();
  },
  onChildEditorChange: function (editor) {
    this.refreshValue(editor.key);
    this._super(editor);
  },
  onImageUpload: function (image) {
    this.editors.width.setValue(image.width);
    this.editors.height.setValue(image.height);
  },
  getValue: function () {
    var result = this._super();
    if(this.jsoneditor.options.remove_empty_properties || this.options.remove_empty_properties) {
      for(var i in result) {
        if(result.hasOwnProperty(i)) {
          if(!result[i]) delete result[i];
        }
      }
    }
    return result;
  },
  // Main function for updating when changes to the data are made
  refreshValue: function (key) {
    this.value = {};

    for (var i in this.editors) {
      if(!this.editors.hasOwnProperty(i)) continue;
      this.value[i] = this.editors[i].getValue();
    }
  },
  // Adds the object properties from the schema as child editors
  addObjectProperty: function (name, prebuild_only) {
    // if property already exists
    if (this.editors[name]) return;

    // property in cache
    if(this.cached_editors[name]) {
      this.editors[name] = this.cached_editors[name];
      if(prebuild_only) return;
      this.editors[name].register();
    } else { // new property

      // Don't allow new properties outside of the schema
      if((!this.schema.properties || !this.schema.properties[name])) {
        return;
      }

      var schema = $extend(this.schema.properties[name] || {});
      var editor = this.jsoneditor.getEditorClass(schema);

      // Create child editor
      this.editors[name] = this.jsoneditor.createEditor(editor, {
        jsoneditor: this.jsoneditor,
        schema: schema,
        path: this.path + '.' + name,
        parent: this
      });
      this.editors[name].preBuild();

      if (!prebuild_only) {
        var holder = this.theme.getChildEditorHolder();
        this.editor_holder.appendChild(holder);
        this.editors[name].setContainer(holder);
        this.editors[name].build();
        this.editors[name].postBuild();
      }
      // add this editor to cache
      this.cached_editors[name] = this.editors[name];
    }
  },
  isRequired: function(editor) {
    if(typeof editor.schema.required === "boolean") return editor.schema.required;
    else if(Array.isArray(this.schema.required)) return this.schema.required.indexOf(editor.key) > -1;
    else if(this.jsoneditor.options.required_by_default) return true;
    else return false;
  },
  showValidationErrors: function(errors) {
    var self = this;

    // Get all the errors that pertain to this editor
    var my_errors = [];
    var other_errors = [];
    $each(errors, function(i,error) {
      if(error.path === self.path) {
        my_errors.push(error);
      }
      else {
        other_errors.push(error);
      }
    });

    // Show errors for this editor
    if(this.error_holder) {
      if(my_errors.length) {
        var message = [];
        this.error_holder.innerHTML = '';
        this.error_holder.style.display = '';
        $each(my_errors, function(i,error) {
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message));
        });
      }
      // Hide error area
      else {
        this.error_holder.style.display = 'none';
      }
    }

    // Show error for the table row if this is inside a table
    if(this.options.table_row) {
      if(my_errors.length) {
        this.theme.addTableRowError(this.container);
      }
      else {
        this.theme.removeTableRowError(this.container);
      }
    }

    // Show errors for child editors
    $each(this.editors, function(i,editor) {
      editor.showValidationErrors(other_errors);
    });
  }
});