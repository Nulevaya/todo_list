Rails.application.routes.draw do
  get '/', to: redirect('/projects')

  resources :projects, only: %i(index create update destroy) do
    resources :tasks, only: %i(create update destroy), controller: 'projects/tasks' do
      resource :reorder, only: :create, controller: 'projects/tasks/reorder'
      resource :toggle_status, only: :create, controller: 'projects/tasks/toggle_status'
      resource :set_deadline, only: :create, controller: 'projects/tasks/set_deadline'
    end
  end
end