class Api::UsersController < ApplicationController
  def index
    @user = User.find_by(email: params[:keyword])
    render json:@user
  end

  def update
    @user = User.find(params[:id])
    @user.update(update_params)
  end

  private

  def update_params
    params.permit(:id, :name, :email)
  end
end