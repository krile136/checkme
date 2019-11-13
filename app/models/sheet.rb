class Sheet < ApplicationRecord
  belongs_to :user

  has_many :items, dependent: :destroy
  accepts_nested_attributes_for :items, allow_destroy: true

  has_many :cooperate_requests, dependent: :destroy

  def get_today_time(now_time)
    time_diff = (now_time - self.last_view)/60/60
    return_time = 0
    # 1時間前なら分表示、1時間以上前なら時間表示する
    if time_diff <= 1
      return_time = (time_diff*60).floor.to_s + "分前"
    else
      return_time = time_diff.floor.to_s + "時間前"
    end
  end

  def get_week_days(now_time)
    time_diff = (now_time.to_i - self.last_view.to_i)/60/60/24
    week_day = time_diff.floor.to_s + "日前"
    
  end
  def get_month_days(time_diff)
    month_day = self.last_view.strftime("%Y/%m/%d")
  end
end
