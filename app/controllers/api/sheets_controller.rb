class Api::SheetsController < ApplicationController
  def index
    

  end

  def mypage
    user_sheets = Sheet.includes(:users).includes(:cooperate_requests).where(users: { id: current_user.id })
    @sheets = user_sheets.where('title LIKE(?)',"%#{params[:keyword]}%").order('last_view DESC')
  end

  def public
    user = User.find_by(name: current_user.name)
    @sheets = Sheet.where.not(author: user.name).where('title LIKE(?)',"%#{params[:keyword]}%").where(is_public: true).order('last_view DESC')
  end

end