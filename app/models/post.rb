class Post < ApplicationRecord
  def unread
    updated_at < 1.minutes.ago
  end
end
