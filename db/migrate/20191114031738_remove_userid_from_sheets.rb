class RemoveUseridFromSheets < ActiveRecord::Migration[5.2]
  def up
    remove_column :sheets, :user_id
  end

  def down
    add_reference :sheets, :user, null: false, foreign_key: true
  end
end
