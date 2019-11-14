class CreateUserSheets < ActiveRecord::Migration[5.2]
  def change
    create_table :user_sheets do |t|
      t.references :user, null: false, foreign_key: true
      t.references :sheet, null: false, foreign_key: true
      t.timestamps
    end
  end
end
