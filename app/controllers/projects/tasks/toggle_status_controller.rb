module Projects
  module Tasks
    class ToggleStatusController < ApplicationController
      def create
        @task = Project.find(params[:project_id]).tasks.find(params[:task_id])
        @task.status = params[:status]
  
        if @task.save!
          head :ok
        else
          head :unprocessable_entity
        end
      end
    end
  end
end