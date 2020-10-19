module Projects
  module Tasks
    class SetDeadlineController < ApplicationController
      def create
        @task = Project.find(params[:project_id]).tasks.find(params[:task_id])
        @task.deadline = params[:deadline]
  
        if @task.save!
          head :ok
        else
          head :unprocessable_entity
        end
      end
    end
  end
end