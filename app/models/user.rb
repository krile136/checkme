class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :sheets, dependent: :destroy
  has_many :cooperate_requests, dependent: :destroy
end
