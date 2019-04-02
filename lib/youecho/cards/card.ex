defmodule Youecho.Cards.Card do
  use Ecto.Schema

  import Ecto.Query
  import Ecto.Changeset

  alias Youecho.Cards.Card
  alias Youecho.Repo


  schema "cards" do
    field :title, :string
    field :translate, :string
    field :iterate_count, :integer, default: 0
    field :example, :string

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :translate, :example])
    |> validate_required([:title, :translate])
  end

  def increment(id) do
    card = Repo.get(Card, id)
    result = card.iterate_count + 1

    from(c in Card, where: c.id == ^id)
    |> Repo.update_all(set: [iterate_count: result])

    result
  end
end
