class SheetsController < ApplicationController
  before_action :move_to_index, except: :index

  def index

  end

  def new
    @sheet = Sheet.new
    @sheet.items.build
  end

  def show 
    @sheet = Sheet.find(params[:id])
    @item = Item.where(sheet_id: @sheet.id).order('top ASC')
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

  def update
     @sheet = Sheet.find(params[:id]) 
     @sheet.update(item_params)
  end

  def destroy
    sheet = Sheet.find(params[:id])
    if sheet.user_id == current_user.id
      if sheet.destroy
        redirect_to user_path(current_user)
      else
        redirect_to user_path(current_user)
      end
    else
      redirect_to user_path(current_user)
    end
  end

  private

  def move_to_index
    redirect_to root_path unless user_signed_in?
  end

  def sheet_params
    params.require(:sheet).permit(:title,
                  items_attributes:[:name, :is_head, :top])
                  .merge(user_id: current_user.id).merge(pulling_number: 0).merge(last_view: Time.now)
  end
  def item_params
    params.require(:sheet).permit(items_attributes:[:id, :is_check])
  end
end
