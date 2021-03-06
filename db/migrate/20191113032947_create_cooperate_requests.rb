class CreateCooperateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :cooperate_requests do |t|
      t.integer :request_id, null: false
      t.references :sheet, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
