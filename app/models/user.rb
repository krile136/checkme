class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :user_sheets, dependent: :destroy
  has_many :sheets, through: :user_sheets, dependent: :destroy

  has_many :cooperate_requests, dependent: :destroy

  def self.guest
    find_or_create_by(email: 'guest@example.com', name: 'guest') do |user|
      user.password = SecureRandom.urlsafe_base64
    end
  end
end
