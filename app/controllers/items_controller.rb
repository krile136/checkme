class ItemsController < ApplicationController
  def update
    @sheet = Sheet.find(params[:id])
    @sheet.update(item_params)
  end

  private
  def item_params
    params.require(:sheet).permit(items_attributes:[:id, :is_check])
  end
end
