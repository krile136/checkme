class AddTopToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :top, :integer, null: false, after: :is_check
  end
end
