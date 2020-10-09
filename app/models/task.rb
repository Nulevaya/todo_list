class Task < ApplicationRecord
  belongs_to :project

  validates :name, presence: true
  validates :status, presence: true

  enum status: [ :in_progress, :completed ]

  is_positionable scope: :project, start: 1
end