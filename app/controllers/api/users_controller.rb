class Api::UsersController < ApplicationController
  def index
    @user = User.find_by(email: params[:keyword])
    render json:@user
  end
end