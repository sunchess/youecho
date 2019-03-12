defmodule Youecho.Repo.Migrations.CreateDialogs do
  use Ecto.Migration

  def change do
    create table(:dialogs) do
      add :question, :string
      add :answer, :string
      add :iterate_count, :integer, default: 0, null: false
      add :answer_pronounce, :boolean, default: false, null: false

      timestamps()
    end

  end
end
