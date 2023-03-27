class Message < ApplicationRecord
  def self.random
    random_id = Random.rand(1..5)
    Message.find(random_id)
  end
end
