class SheetsController < ApplicationController
  before_action :move_to_index, except: :index

  def index

  end

  def new
    @sheet = Sheet.new
    @sheet.items.build
  end

  def create
    @sheet = Sheet.new(sheet_params)
    if @sheet.save
      # redirect_to root_path, notice: '出品が完了しました'
      redirect_to root_path
    else
      redicret_to new_sheet_path
    end
  end

  private

  def move_to_index
    redirect_to root_path unless user_signed_in?
  end

  def sheet_params
    params.require(:sheet).permit(:title,
                  items_attributes:[:name, :is_head, :top])
                  .merge(user_id: current_user.id).merge(pulling_number: 0)
  end
end
