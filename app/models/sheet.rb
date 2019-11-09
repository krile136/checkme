class Sheet < ApplicationRecord
  belongs_to :user

  has_many :items, dependent: :destroy
  accepts_nested_attributes_for :items, allow_destroy: true

  def get_today_time(time_drift)
    today_time = (self.last_view + time_drift).strftime("%H：%M")
  end
  def get_week_days(time_drift)
    weeK_day = self.last_view.strftime("%Y/%m/%d")
  end
end
