class UsersController < ApplicationController
  before_action :move_to_index

  def index
    
  end

  def show

    # 今の時間を取得（データベース用に修正）
    today = Time.now

    # 昨日までの時間を取得（データベース用に修正）
    one_day = 60 * 60 * 24
    yesterday = today - one_day

    # １週間の期間を取得（データベース用に修正）
    one_week = today - (one_day * 7)
    
    @today_sheets = Sheet.where(user_id: current_user.id).where(last_view: yesterday..today)
    @week_sheets = Sheet.where(last_view: one_week..yesterday)

    binding.pry

  end

  private

  def move_to_index
    redirect_to root_path unless user_signed_in?
  end
end
