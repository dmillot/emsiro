tinymce.init({
    selector: '#mytextarea',
    height: 550,
    plugins: 'print preview fullpage powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons',
    menu : { // this is the complete default configuration
      file   : {title : 'File'  , items : 'save newdocument | print'},
      edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
      insert : {title : 'Insert', items : 'link media | template hr'},
      view   : {title : 'View'  , items : 'visualaid'},
      format : {title : 'Format', items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
      table  : {title : 'Table' , items : 'inserttable tableprops deletetable | cell row column'},
      tools  : {title : 'Tools' , items : 'spellchecker code'}
  },
  toolbar: "save | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
   
   
   
   
   
    save_enablewhendirty: true,
    save_oncancelcallback:   function save (editor) {
      // APPEND DATA
      var data = new FormData();
      data.append('mytextarea', editor.getContent());
  
      // AJAX
      var xhr = new XMLHttpRequest();
      xhr.open('POST', "preview.ejs", true);
      xhr.onload = function(){
        if (xhr.status==200) {
          var response = JSON.parse(this.response);
          console.log(response.message);
        } else { alert("ERROR LOADING preview.ejs!"); }
      };
      xhr.send(data);
    },
    
    templates: [
      {title: 'Index', description: 'Index Page template', url: '/'},
      {title: 'About', description: 'Index Page template', url: '/about'},
      {title: 'Favory', description: 'Index Page template', url: '/favory'},
      {title: 'Login', description: 'Index Page template', url: '/login'},
      {title: 'Signup', description: 'Index Page template', url: '/signup'},
      // {title: 'Description Offer', description: 'Index Page template', url: '/'},
      {title: 'Listing', description: 'Index Page template', url: '/listing'},
    ]
    
  });

 
  