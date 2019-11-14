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
      redirect_to user_path(current_user)
    else
      redicret_to new_sheet_path
    end
  end

  def edit
    @sheet = Sheet.find(params[:id])
    @item = Item.where(sheet_id: @sheet.id).order('top ASC')
  end

  def update
    @sheet = Sheet.find(params[:id])
    @sheet.save(update_params)
    @sheet.update(update_params)
    @item = Item.where(sheet_id: @sheet.id).order('top ASC')
    render json: @item
  end

  def destroy
    sheet = Sheet.find(params[:id])
    if sheet.destroy
      redirect_to user_path(current_user)
    else
      redirect_to user_path(current_user)
    end
  end

  def update_date
    @sheet = Sheet.find(params[:id])
    @sheet.update(data_update)
  end

  def get_check
    @item = Item.where(sheet_id: params[:sheet_id]).where(is_head: "false").order('top ASC')
    render json: @item
  end

  private

  def move_to_index
    redirect_to root_path unless user_signed_in?
  end

  def sheet_params
    params.require(:sheet).permit(:title,
                  items_attributes:[:name, :is_head, :top])
                  .merge(user_ids: [current_user.id]).merge(pulling_number: 0).merge(last_view: Time.now).merge(author: current_user.name)
  end

  def update_params
    params.require(:sheet).permit(:title,
                  items_attributes:[:id, :name, :is_head, :top, :_destroy])
                  .merge(last_view: Time.now)
  end

  def data_update
    params.require(:sheet).permit(:id).merge(last_view: Time.now)
  end
end
