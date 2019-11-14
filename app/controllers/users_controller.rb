class UsersController < ApplicationController
  before_action :move_to_index

  def index
    @users = User.where('name LIKE(?)',"%#{params[:keyword]}%")
    @requests = CooperateRequest.where(user_id: current_user.id)
    if params[:keyword] == ""
      @users = []
    end
    render json:@users
  end

  def show
    # 時差を取得
    location = "Asia/Tokyo"
    time_drift = ActiveSupport::TimeZone.create(location).utc_offset

    # 以下の部分では、時差を考慮しなくても正しい期間で取得ができるよう
    # 表示するときに、時差を加えて表示させる

    # 今の時間を取得
    today = Time.now

    # 昨日までの時間を計算
    one_day = 60 * 60 * 24
    yesterday = today - one_day

    # １週間の期間を計算
    one_week = today - (one_day * 7)

    # 一ヶ月の期間を計算
    one_month = today - (one_day * 30)
    
    @user_sheets = Sheet.includes(:users).where(users: { id: params[:id] })

    @today_sheets = @user_sheets.where(last_view: yesterday..today).order("last_view DESC")
    @today_number = @today_sheets.length

    @week_sheets = @user_sheets.where(last_view: one_week..yesterday).order("last_view DESC")
    @week_number = @week_sheets.length

    @month_sheets = @user_sheets.where(last_view: one_month..one_week).order("last_view DESC")
    @month_number = @month_sheets.length

    @today_time = @today_sheets.map{|sheet| sheet.get_today_time(today)}
    @week_days = @week_sheets.map{|sheet| sheet.get_week_days(today)}
    @month_days =  @month_sheets.map{|sheet| sheet.get_month_days(time_drift)}

    @requests = CooperateRequest.where(request_id: current_user.id).includes(:user).includes(:sheet)
    @requests_number = @requests.length
    @requests_time = @requests.map{|request| request.sheet.get_request_last_view(today)}
    binding.pry
  end

  private

  def move_to_index
    redirect_to root_path unless user_signed_in?
  end
end
