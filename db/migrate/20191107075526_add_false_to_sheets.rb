class AddFalseToSheets < ActiveRecord::Migration[5.2]
  def change
    change_column :sheets, :is_public, :boolean, default: false, null: false
    change_column :sheets, :is_cooperate, :boolean, default: false, null: false
    change_column :sheets, :is_secret, :boolean, default: false, null: false
    change_column :sheets, :is_pulled, :boolean, default: false, null: false
  end
end
