defmodule Youecho.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :title, :string
      add :translate, :string
      add :iterate_count, :integer, default: 0, null: false

      timestamps()
    end

  end
end
