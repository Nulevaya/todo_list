module Projects
  module Tasks
    class ReorderController < ApplicationController
      def create
        @task = Project.find(params[:project_id]).tasks.find(params[:task_id])
        @task.move_to params[:new_position].to_i
  
        head :ok
      end
    end
  end
end