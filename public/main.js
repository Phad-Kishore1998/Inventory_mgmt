//Func called by button and then using confirm for dialog box.
//dialog returns true/false for calling the delete option else 
//we call the base api
function deleteProduct(id) {
    const result = confirm(
      'Are you sure you want to delete this testing product ?'
    );
    
    if (result) {
      fetch('/delete-product/' + id, {
        method: 'POST',
      }).then((res) => {
        if (res.ok) {
          window.location.href = "/";
        }
      });
    }
  }
  