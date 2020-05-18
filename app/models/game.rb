require 'securerandom'

class Game < ApplicationRecord
  has_many :players
  before_create :init

  def init
    self.deck = *(0..80)
    self.deck.shuffle!
    self.board = self.deck.shift(12)
    self.room = SecureRandom.hex 2
    while !self.valid? do
      self.room = SecureRandom.hex 2
    end
  end
end
