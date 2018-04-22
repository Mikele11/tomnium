$(document).ready(function() {
	$("#addform").click(function() {
		$("#contactAdd").show();
	});
	$("#cancel").click(function() {
		$(this).parent().hide();
	});
});