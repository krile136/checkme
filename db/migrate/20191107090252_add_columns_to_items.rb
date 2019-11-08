class AddColumnsToItems < ActiveRecord::Migration[5.2]
  def change
    change_column :items, :is_check, :boolean, default: false, null: false
    add_column :items, :is_head, :boolean, default: false, null: false, after: :id
  end
end
