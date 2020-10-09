class AddPositionToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :position, :integer, null: false, default: 1
  end
end
