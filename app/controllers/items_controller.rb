class ItemsController < ApplicationController
  before_action :move_to_index, except: :index
  
  def show
    @items = Item.where(sheet_id: params[:id]).order('top ASC')
    render json:@items
  end

  def update
    @sheet = Sheet.find(params[:id])
    @sheet.update(item_params)
  end

  private
  def item_params
    params.require(:sheet).permit(items_attributes:[:id, :is_check])
  end

  private

  def move_to_index
    redirect_to root_path unless user_signed_in?
  end
end
