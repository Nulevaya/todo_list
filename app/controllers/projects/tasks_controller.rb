module Projects
  class TasksController < ApplicationController
    before_action :set_project
    before_action :set_task, only: [:update, :destroy]

    def create
      project_tasks = @project.tasks.order(position: :asc)

      task = project_tasks.new(name: params[:name], 
                               status: "in_progress",
                               position: project_tasks.last.position + 1)

      if task.save!
        redirect_to projects_path
      else
        head :unprocessable_entity
      end
    end

    def update
      @task.name = params[:name]

      if @task.save!
        redirect_to projects_path
      else
        head :unprocessable_entity
      end
    end

    def destroy
      @task.destroy

      redirect_to projects_path
    end

    private

    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_task
      @task = @project.tasks.find(params[:id])
    end
  end
end