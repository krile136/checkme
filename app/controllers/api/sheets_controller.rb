class Api::SheetsController < ApplicationController
  def index
    

  end

  def mypage
    # @user_sheets = Sheet.includes(:users).where(users: { id: current_user.id })
    binding.pry
  end

  def public
    # @user_sheets = Sheet.includes(:users).where(users: { id: current_user.id })
    binding.pry
  end

end