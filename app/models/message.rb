class Message < ApplicationRecord
  mount_uploder :image, ImageUploder
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
end
