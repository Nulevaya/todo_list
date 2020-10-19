$(document).on('turbolinks:load', function() {
  $('.datetimepicker').datetimepicker();

  $(document).on("mouseover", ".task-row", function(){$(this).find(".task-instruments").css('visibility', 'visible')})
            .on("mouseout", ".task-row", function(){$(this).find(".task-instruments").css('visibility', 'hidden')});

  $(document).on("mouseover", ".task-row", function(){$(this).find(".deadline").css('visibility', 'hidden')})
            .on("mouseout", ".task-row", function(){$(this).find(".deadline").css('visibility', 'visible')});

  $(document).on("mouseover", ".card-header", function(){$(this).find(".header-task-instruments").css('visibility', 'visible')})
            .on("mouseout", ".card-header", function(){$(this).find(".header-task-instruments").css('visibility', 'hidden')});
  
  $(document).on("click", ".fa-calendar-day", function() {
    let column = $(this).parent().parent().parent();
    let taskInstrumentsContainer = $(this).parent().parent();
    let dateTimeInput = column.find(".datetime");

    dateTimeInput.css('display', 'flex');
    taskInstrumentsContainer.css('display', 'none');
  })

  $(document).on("click", ".set-deadline-button", function() {
    let column = $(this).parent().parent();
    let dateTimeInput = $(this).parent()
    let dateTimeInputField = dateTimeInput.find(".datetimepicker")
    let taskInstrumentsContainer = column.find('.task-instruments-container');
    let deadLineField = taskInstrumentsContainer.find(".deadline")

    let projectIdArray = this.closest(".card").id.split("-");
    let projectId = projectIdArray[projectIdArray.length - 1];
    let taskIdArray = this.closest(".task-row").id.split("-");
    let taskId = taskIdArray[taskIdArray.length - 1];

    let newValue = dateTimeInputField.val();

    dateTimeInput.css('display', 'none');
    taskInstrumentsContainer.css('display', 'block');

    $.ajax({
      type: "POST",
      headers: {
          'X-Transaction': 'POST Example',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      url: `projects/${projectId}/tasks/${taskId}/set_deadline`,
      dataType: "json",
      data: {"deadline": `${newValue}`}
    });

    deadLineField.html(newValue);
  })

  $(document).on("click", ".edit-project", function(){
    let generalHeader = $(this).parent().parent().parent();
    let editProjectHeader = generalHeader.parent().find(".project-edit");
    generalHeader.css('display', 'none');
    editProjectHeader.css('display', 'block');
  })
  
  $(document).on("click", ".save-project-button", function(){
    let editProjectHeader = $(this).parent().parent();
    let generalHeader = editProjectHeader.parent().find(".project-header");
    editProjectHeader.css('display', 'none');
    generalHeader.css('display', 'block');
  })

  $(document).on("click", ".edit-task", function(){
    let taskName = $(this).parent().parent().parent().find(".table-task-name");
    let editTaskRow = $(this).parent().parent().parent().find(".table-task-edit-form");

    taskName.css('display', 'none');
    editTaskRow.css('display', 'block');
  })

  $(document).find(".task-status").change(function() {
    let projectIdArray = this.closest(".card").id.split("-");
    let projectId = projectIdArray[projectIdArray.length - 1];
    let taskIdArray = this.closest(".task-row").id.split("-");
    let taskId = taskIdArray[taskIdArray.length - 1];

    if(this.checked) {
      $(this).prop("checked", true);
      $.ajax({
        type: "POST",
        headers: {
            'X-Transaction': 'POST Example',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        url: `projects/${projectId}/tasks/${taskId}/toggle_status`,
        dataType: "json",
        data: {"status": "completed"}
      })
    } else {
      $(this).prop("checked", false);
      $.ajax({
        type: "POST",
        headers: {
            'X-Transaction': 'POST Example',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        url: `projects/${projectId}/tasks/${taskId}/toggle_status`,
        dataType: "json",
        data: {"status": "in_progress"}
      })
    }
  });

  $(function() {
    $(document).find(".sortable-tasks").sortable({
      cursor: 'move',
      axis:   'y',
      update: function(e, ui) {
        let elementId = ui.item.attr("id").split("-");
        let id = elementId[elementId.length - 1];
        let projectElementIdArray = ui.item.parents()[3].id.split("-");
        let projectId = projectElementIdArray[projectElementIdArray.length - 1];
        let index = ui.item.index();
        $.ajax({
          type: "POST",
          headers: {
              'X-Transaction': 'POST Example',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          url: `projects/${projectId}/tasks/${id}/reorder`,
          dataType: "json",
          data: {"new_position": index + 1}
        })
      }
    });
  });
});