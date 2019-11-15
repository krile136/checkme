class Api::SheetsController < ApplicationController
  def index
    

  end

  def mypage
    @user_sheets = Sheet.includes(:users).where(users: { id: current_user.id })
    @sheets = @user_sheets.where('title LIKE(?)',"%#{params[:keyword]}%").order('last_view DESC')
  end

  def public
    @sheets = Sheet.includes(:users).where('title LIKE(?)',"%#{params[:keyword]}%").where(is_public: true).order('last_view DESC')
  end

end