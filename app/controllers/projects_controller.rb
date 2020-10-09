class ProjectsController < ApplicationController
  def index
    @projects = Project.default_order
  end

  def create
    project = Project.new(name: "New Project")

    if project.save!
      redirect_to projects_path
    else
      head :unprocessable_entity
    end
  end

  def update
    @project = Project.find(params[:id])
    
    @project.name = params[:name]

    if @project.save!
      redirect_to projects_path
    else
      head :unprocessable_entity
    end
  end

  def destroy
    Project.find(params[:id]).destroy

    redirect_to projects_path
  end
end