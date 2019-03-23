defmodule Youecho.Repo.Migrations.AddExmaplePhraseToCards do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      add :example, :string
    end
  end
end
