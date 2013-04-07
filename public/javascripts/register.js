$(function() {
	$('#successreg').hide();
	$("#register").submit(function(e) { e.preventDefault();
		var dataJax = $('#register').serialize();
		$.ajax({
			type: 'POST',
			url: '/register.html',
			data: dataJax,
			dataType: "JSON",
			success: function(data) {
				$('.regbody').hide();
				$('#successreg').show();
				if(data.error) {
					$('#alertsuccessreg').text(data.error);
				} else {
					$('#alertsuccessreg').text(data.success);
				}
				if(!data) {
					$('#alertsuccessreg').text('Failed to connect to the database.');
				}
			}
		});
	});

	$('#gobackreg').click(function(e) { e.preventDefault();
		$('.regbody').show();
		$('#successreg').hide();
	});

	$('#alert_user_username').hide();
    $('#alert_user_email').hide();
    $('#alert_user_password').hide();
    $('#alert_user_passwordc').hide();
    var submit_btn = document.getElementById('registeruser');
    var username  = $('#user_username');
    var email     = $('#user_email');
    var password  = $('#user_password');
    var passwordc = $('#user_passwordc');
    submit_btn.disabled = true;
    $('#user_username').on('keyup change', function() {
      if (username.val().length <= 0) {
        $('#alert_user_username').text('Username must be more than 2 characters.');
        submit_btn.disabled = true;
        $('#alert_user_username').show();
      }
      else {
        $('#alert_user_username').text('');
        submit_btn.disabled = false;
        $('#alert_user_username').hide();
      }
	    if(username.val() == '') {
		submit_btn.disabled = true;
	    }
	    if(email.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(passwordc.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() !== passwordc.val()) {
	    	submit_btn.disabled = true;
	    }
	    if(!document.getElementById('user_email').checkValidity()) {
	    	submit_btn.disabled = true;
	    }
   });

    $('#user_email').on('keyup change', function() {
      if ((email.val().length <= 4) || (!document.getElementById('user_email').checkValidity())) {
        $('#alert_user_email').text('Email must be more than 4 characters and a valid format');
        submit_btn.disabled = true;
        $('#alert_user_email').show();
      } else {
        $('#alert_user_email').text('');
        submit_btn.disabled = false;
        $('#alert_user_email').hide();
      }
	    if(username.val() == '') {
		submit_btn.disabled = true;
	    }
	    if(email.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(passwordc.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() !== passwordc.val()) {
	    	submit_btn.disabled = true;
	    }
	    if(!document.getElementById('user_email').checkValidity()) {
	    	submit_btn.disabled = true;
	    }
    });   

    $('#user_password').on('keyup change', function() {
      if (password.val().length <= 7) {
        $('#alert_user_password').text('Password cannot be less than 6 characters long');
        submit_btn.disabled = true;
        $('#alert_user_password').show();
      } else {
        $('#alert_user_password').text('');
        submit_btn.disabled = false;
        $('#alert_user_password').hide();
      }

      if (password.val() !== passwordc.val()) {
        $('#alert_user_passwordc').text('Passwords do not match');
        submit_btn.disabled = true;
        $('#alert_user_passwordc').show();
      } else {
        $('#alert_user_passwordc').text('');
        submit_btn.disabled = false;
        $('#alert_user_passwordc').hide();
      }
	    if(username.val() == '') {
		submit_btn.disabled = true;
	    }
	    if(email.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(passwordc.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() !== passwordc.val()) {
	    	submit_btn.disabled = true;
	    }
	    if(!document.getElementById('user_email').checkValidity()) {
	    	submit_btn.disabled = true;
	    }

    });

    $('#user_passwordc').on('keyup change', function() {
      if (password.val() !== passwordc.val()) {
        $('#alert_user_passwordc').text('Passwords do not match');
        submit_btn.disabled = true;
        $('#alert_user_passwordc').show();
      } else {
        $('#alert_user_passwordc').text('');
        submit_btn.disabled = false;
        $('#alert_user_passwordc').hide();
      }
	    if(username.val() == '') {
		submit_btn.disabled = true;
	    }
	    if(email.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(passwordc.val() == '') {
	    	submit_btn.disabled = true;
	    }
	    if(password.val() !== passwordc.val()) {
	    	submit_btn.disabled = true;
	    }
	    if(!document.getElementById('user_email').checkValidity()) {
	    	submit_btn.disabled = true;
	    }
    });
   });