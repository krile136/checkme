class SheetsController < ApplicationController
  before_action :move_to_index, except: :index

  def index

  end

  def new
    @sheet = Sheet.new
    @sheet.items.build
  end

  def show 
    if Sheet.find_by(id: params[:id])
      @sheet = Sheet.find(params[:id])
      @item = Item.where(sheet_id: @sheet.id).order('top ASC')
      redirect_to user_path(current_user.id) if @sheet.users.first.id!=current_user.id
    else
      redirect_to user_path(current_user.id)
    end
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

  def set_public
    @sheet = Sheet.find(params[:id])
    @sheet.update(public_update(true))
    render json: @sheet
  end

  def cancel_public
    @sheet = Sheet.find(params[:id])
    @sheet.update(public_update(false))
    render json: @sheet
  end

  def pull
    sheet = Sheet.find(params[:id])
    cloned_sheet = sheet.deep_clone include: [:items, :user_sheets], only: [:title, :pulling_number, :author, { items: [:name, :is_head, :top]}]
    user_sheets_first = cloned_sheet.user_sheets.first
    user_sheets_first.user_id = current_user.id
    cloned_sheet.user_sheets = []
    cloned_sheet.user_sheets.push(user_sheets_first)
    cloned_sheet.last_view = Time.now
    cloned_sheet.is_pulled = true

    cloned_sheet.save

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

  def sheet_pull_params(prms)
    prms.require(:sheet).permit(:title,:is_public,:pulling_number,:author,
                                items_attributes:[:name, :is_head, :top])
                                .merge(user_ids:[current_user.id]).merge(last_view: Time.now)
  end
    

  def update_params
    params.require(:sheet).permit(:title,
                  items_attributes:[:id, :name, :is_head, :top, :_destroy])
                  .merge(last_view: Time.now)
  end

  def data_update
    params.require(:sheet).permit(:id).merge(last_view: Time.now)
  end

  def public_update(bool)
    params.permit(:id).merge(is_public: bool)
  end
end
