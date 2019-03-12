defmodule Youecho.Dialogs.Question do
  use Ecto.Schema
  import Ecto.Changeset


  schema "dialogs" do
    field :question, :string
    field :answer, :string
    field :answer_pronounce, :boolean, default: false
    field :iterate_count, :integer, default: 0

    timestamps()
  end

  @doc false
  def changeset(question, attrs) do
    question
    |> cast(attrs, [:question, :answer, :answer_pronounce])
    |> validate_required([:question, :answer, :answer_pronounce])
  end
end
