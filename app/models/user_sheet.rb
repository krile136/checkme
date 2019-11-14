class UserSheet < ApplicationRecord
  belongs_to :user
  belongs_to :sheet
end
