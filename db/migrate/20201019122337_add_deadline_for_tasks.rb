class AddDeadlineForTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :deadline, :datetime, null: true, default: ''
  end
end