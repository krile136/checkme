class AddHowtoflagToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :show_howto, :boolean, default: true
  end
end
