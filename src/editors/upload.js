JSONEditor.defaults.editors.upload = JSONEditor.AbstractEditor.extend({
  getNumColumns: function() {
    return 4;
  },
  build: function() {
    var self = this;
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    // Input that holds the base64 string
    if (this.options.image) {
      this.inputLabel = this.theme.getFormInputLabel('Url');
      this.container.appendChild(this.inputLabel);
    }
    this.input = this.theme.getFormInputField(this.options.image ? 'text' : 'hidden');
    this.container.appendChild(this.input);
    // Add a change listener to upload via url for imageUploader
    if (this.options.image) {
      this.input.addEventListener('change', function (e) {
        if (self.value !== e.target.value) {
          self.uploader.value = '';
          try {
            var url = new URL(e.target.value);
          } catch (error) {
            self.setValue(e.target.value);
            self.resetValues();
            if (self.preview) self.preview.innerHTML = '<strong>Invalid url format</strong>';
            return;
          }
          self.preview_value = e.target.value;
          self.setValue(e.target.value);
          self.refreshPreview(true);
        }
      });
    }

    // Don't show uploader if this is readonly
    if(!this.schema.readOnly && !this.schema.readonly) {
      if(!this.jsoneditor.options.upload || typeof this.jsoneditor.options.upload !== 'function') {
        throw "Upload handler required for upload editor";
      }

      // File uploader
      this.uploader = this.theme.getFormInputField('file');
      if (this.options.image) {
        this.uploader.accept = "image/jpeg, image/png, image/gif, image/bmp";
      }
      this.uploader.addEventListener('change',function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(this.files && this.files.length) {
          var fr = new FileReader();
          fr.onload = function(evt) {
            self.preview_value = evt.target.result;
            self.refreshPreview();
            self.onChange(true);
            fr = null;
          };
          fr.readAsDataURL(this.files[0]);
        }
      });
    }

    var description = this.schema.description;
    if (!description) description = '';

    this.preview = this.theme.getFormInputDescription(description);
    this.container.appendChild(this.preview);

    this.control = this.theme.getFormControl(this.label, this.uploader||this.input, this.preview);
    this.container.appendChild(this.control);
  },
  refreshPreview: function(fromUrl) {
    if(this.last_preview === this.preview_value) return;
    this.last_preview = this.preview_value;

    this.preview.innerHTML = '';
    
    if(!this.preview_value) return;

    var self = this;

    var mime = this.preview_value.match(/^data:([^;,]+)[;,]/);
    mime = mime ? mime[1] : fromUrl ? 'Url Preview' : 'unknown';
    this.preview.innerHTML = '<strong>Type:</strong> '+mime;

    var file = this.uploader.files[0];

    if (file && !fromUrl) this.preview.innerHTML +=', <strong>Size:</strong> '+file.size+' bytes';
    if(mime.substr(0,5)==="image" || fromUrl) {
      this.preview.innerHTML += '<br>';
      var img = document.createElement('img');
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100px';
      img.onload = function () {
        self.image = img;
        if (fromUrl && self.parent && self.parent.onImageUpload) {
          self.parent.onImageUpload(img);
          self.parent.onChildEditorChange(self);
        }
      };
      img.onerror = function (error) {
        self.preview.innerHTML = '<strong>Could not load image from that url</strong>';
        throw "Error loading image";
      };
      img.src = this.preview_value;
      this.preview.appendChild(img);
    }

    this.preview.innerHTML += '<br>';
    if (!fromUrl) {
      var uploadButton = this.getButton('Upload', 'upload', 'Upload');
      this.preview.appendChild(uploadButton);
      uploadButton.addEventListener('click',function(event) {
        event.preventDefault();

        uploadButton.setAttribute("disabled", "disabled");
        self.theme.removeInputError(self.uploader);

        if (self.theme.getProgressBar) {
          self.progressBar = self.theme.getProgressBar();
          self.preview.appendChild(self.progressBar);
        }

        self.jsoneditor.options.upload(self.path, file, {
          success: function(url) {
            self.setValue(url);

            if (self.options.image && self.parent && self.parent.onImageUpload) {
              self.parent.onImageUpload(self.image);
            }
            if(self.parent) self.parent.onChildEditorChange(self);
            else self.jsoneditor.onChange();

            if (self.progressBar) self.preview.removeChild(self.progressBar);
            uploadButton.removeAttribute("disabled");
          },
          failure: function(error) {
            self.theme.addInputError(self.uploader, error);
            if (self.progressBar) self.preview.removeChild(self.progressBar);
            uploadButton.removeAttribute("disabled");
          },
          updateProgress: function(progress) {
            if (self.progressBar) {
              if (progress) self.theme.updateProgressBar(self.progressBar, progress);
              else self.theme.updateProgressBarUnknown(self.progressBar);
            }
          }
        });
      });
    }
  },
  enable: function() {
    if(this.uploader) this.uploader.disabled = false;
    this._super();
  },
  disable: function() {
    if(this.uploader) this.uploader.disabled = true;
    this._super();
  },
  resetValues: function () {
    this.preview_value = '';
    this.refreshPreview();
    // Send reset function to parent to get rid of width/height
    if (this.parent && this.parent.onImageUpload) {
      this.parent.onImageUpload({});
      this.parent.onChildEditorChange(this);
    }
  },
  getValue: function () {
    return this.value;
  },
  setValue: function(val) {
    if(this.value !== val) {
      this.value = val;
      this.input.value = this.value;
      this.onChange();
    }
  },
  destroy: function() {
    if(this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.uploader && this.uploader.parentNode) this.uploader.parentNode.removeChild(this.uploader);

    this._super();
  }
});
