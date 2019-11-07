class Sheet < ApplicationRecord
  belongs_to :user

  has_many :items, dependent: :destroy
  accepts_nested_attributes_for :items, allow_destroy: true
end
