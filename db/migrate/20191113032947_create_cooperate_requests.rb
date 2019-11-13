class CreateCooperateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :cooperation do |t|
      t.integer :sheet_id, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
