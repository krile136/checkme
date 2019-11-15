class ChangeDefaultToSheet < ActiveRecord::Migration[5.2]
  def up
    change_column :sheets, :is_public, :boolean, default: true, null: false
  end
  def down
    change_column :sheets, :is_public, :boolean, default: false, null: false
  end
end
